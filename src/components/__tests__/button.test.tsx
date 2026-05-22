import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "../button";

describe("Button", () => {
  it("passes through props and children when idle", () => {
    const markup = renderToStaticMarkup(<Button className="action-button">Stake</Button>);

    expect(markup).toContain('class="action-button"');
    expect(markup).toContain(">Stake</button>");
    expect(markup).not.toContain("disabled");
  });

  it("disables the button and shows loading affordances while busy", () => {
    const markup = renderToStaticMarkup(
      <Button isLoading isLoadingText="Staking...">
        Stake
      </Button>
    );

    expect(markup).toContain("disabled");
    expect(markup).toContain("spinner button-spinner");
    expect(markup).toContain("Staking...");
    expect(markup).not.toContain(">Stake</button>");
  });
});
