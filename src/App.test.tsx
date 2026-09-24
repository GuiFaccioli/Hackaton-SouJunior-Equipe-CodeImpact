import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Landing page", () => {
  it("labels the hero supporter card as an illustrative preview", () => {
    const { container } = render(<App />);
    const heroPreview = container.querySelector(".hero .floating-member");

    expect(heroPreview).not.toBeNull();
    expect(heroPreview?.textContent).toContain("Exemplo de apoiador");
    expect(heroPreview?.textContent).toContain("Prévia ilustrativa");
    expect(heroPreview?.textContent).not.toContain("Rafael Miranda");
  });

  it("waits for the selected photo before allowing card generation", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.upload(
      screen.getByLabelText("Foto (opcional)"),
      new File(["pending image"], "photo.png", { type: "image/png" }),
    );
    expect(
      (
        screen.getByRole("button", {
          name: /carregando foto/i,
        }) as HTMLButtonElement
      ).disabled,
    ).toBe(true);
  });

  it("rejects files larger than the photo limit", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.upload(
      screen.getByLabelText("Foto (opcional)"),
      new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.png", {
        type: "image/png",
      }),
    );
    expect(screen.getByRole("alert").textContent).toMatch(/5 MB/);
  });

  it("directs support actions to the official campaign and navigation to existing sections", () => {
    render(<App />);
    const links = screen.getAllByRole("link") as HTMLAnchorElement[];
    const supportLinks = links.filter((link) =>
      /^apoiar/i.test(link.textContent || ""),
    );
    expect(supportLinks.length).toBeGreaterThanOrEqual(5);
    supportLinks.forEach((link) =>
      expect(link.href).toBe("https://apoia.se/soujunior"),
    );
    links
      .filter((link) => link.hash && link.origin === window.location.origin)
      .forEach((link) =>
        expect(document.getElementById(link.hash.slice(1))).not.toBeNull(),
      );
  });

  it("opens mobile navigation and closes it after selecting a section", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: "Abrir menu" });
    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");
    await user.click(
      within(
        screen.getByRole("navigation", { name: "Menu principal" }),
      ).getByText("A causa"),
    );
    expect(toggle.getAttribute("aria-expanded")).toBe("false");
  });

  it("generates a personal card without adding an unverified supporter to the mural", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(
      (screen.getByRole("button", { name: "Baixar" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    await user.type(screen.getByLabelText("Nome"), "Marina Silva");
    await user.type(
      screen.getByLabelText("LinkedIn ou site (opcional)"),
      "linkedin.com/in/marina",
    );
    await user.click(screen.getByRole("button", { name: "Gerar card" }));
    expect(
      within(screen.getByLabelText("Prévia do card")).getByText("Marina Silva"),
    ).toBeTruthy();
    expect(
      (screen.getByRole("button", { name: "Baixar" }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
    expect(
      within(screen.getByLabelText("Mural de apoiadores")).queryByText(
        "Marina Silva",
      ),
    ).toBeNull();
  });

  it("rejects a name made only of spaces", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText("Nome"), "   ");
    await user.click(screen.getByRole("button", { name: "Gerar card" }));
    expect(screen.getByRole("alert").textContent).toMatch(/nome/i);
    expect(
      (screen.getByRole("button", { name: "Baixar" }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });
});
