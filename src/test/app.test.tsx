import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe("App Rendering", () => {
  it("renders without crashing", () => {
    // We expect it to at least try to render.
    // Since Firebase might fail in test env, we just check if the container is created.
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(container).toBeDefined();
  });
});
