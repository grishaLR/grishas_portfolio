import React from "react";
import { Typewriter } from "@components";

export default (() => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>

      <Typewriter text="This will be set by settings" delay={600} />
    </div>
  );
}) as React.FC;
