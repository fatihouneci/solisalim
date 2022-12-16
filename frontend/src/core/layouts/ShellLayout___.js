import React, { useState } from "react";
import ShellHeader from "../components/ShellHeader";
import ShellMain from "../components/ShellMain";
import ShellNav from "../components/ShellNav";

export default function ShellLayout() {
  const [hasNavOpen, setHasNavOpen] = useState(false);
  return (
    <div>
      <ShellHeader hasNavOpen={hasNavOpen} setHasNavOpen={setHasNavOpen} />
      <ShellNav hasNavOpen={hasNavOpen} setHasNavOpen={setHasNavOpen} />
      <ShellMain hasNavOpen={hasNavOpen} setHasNavOpen={setHasNavOpen} />
    </div>
  );
}
