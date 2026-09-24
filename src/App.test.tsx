import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Landing page", () => {
  it("keeps the hero artwork in separate layers with a clipped mascot", () => {
    const { container } = render(<App />);
    const art = container.querySelector(".hero-art");

    expect(art?.querySelector(".hero-art-background")).not.toBeNull();
    expect(art?.querySelector(".hero-mascot-clip")).not.toBeNull();
    expect(art?.querySelectorAll(".hero-mascot")).toHaveLength(1);
    expect(art?.querySelector(".hero-coins")).not.toBeNull();
    expect(art?.querySelector(".floating-member")).not.toBeNull();
    expect(art?.querySelector(".floating-support")).not.toBeNull();
  });

  it("keeps the supporter card artwork layered with one mascot and independent coins", () => {
    const { container } = render(<App />);
    const preview = container.querySelector(".card-preview");

    expect(preview?.querySelector(".preview-artwork-background")).not.toBeNull();
    expect(preview?.querySelectorAll(".preview-mascot")).toHaveLength(1);
    expect(preview?.querySelectorAll(".preview-coins")).toHaveLength(1);
  });

  it("uses the official sXL38 copy and section content", () => {
    const { container } = render(<App />);
    expect(container.querySelector('[data-frame-id="sXL38"]')).not.toBeNull();
    expect(screen.getByText("Doe e concorra a mentorias individuais com quem já trilhou esse caminho.")).toBeTruthy();
    expect(screen.getByText("Ferramentas de colaboração")).toBeTruthy();
    expect(screen.getByText("Reserva operacional")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Concorra a.*mentorias individuais/i })).toBeTruthy();
    expect(screen.getByText("Alice Soares")).toBeTruthy();
    expect(screen.getByText("Top apoiadores")).toBeTruthy();
    expect(screen.getByText("Comprovante de pagamento")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Faça parte.*da SouJunior/i })).toBeTruthy();
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
