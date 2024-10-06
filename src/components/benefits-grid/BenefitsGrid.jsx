import React from "react";
import { motion } from "framer-motion";
import { IntegrationsBlock } from "./IntegrationsBlock";
import { CollaborateBlock } from "./CollaborateBlock";
import { HighlighBlocks } from "./HighlighBlocks";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionSubheading } from "../shared/SectionSubheading";
import { Button } from "../shared/Button";
import { Link } from "react-router-dom";

export const BenefitsGrid = () => {
  return (
    <motion.section
      transition={{
        staggerChildren: 0.1,
      }}
      initial="initial"
      whileInView="whileInView"
      className="relative mx-auto grid max-w-6xl grid-cols-3 gap-4 px-2 md:px-4"
    >
      <div className="col-span-3">
        <SectionHeading>The clear benefits of Repo.Hub</SectionHeading>
        <SectionSubheading>
          Features are good, benefits are even better!
        </SectionSubheading>
      </div>
      {/* <IntegrationsBlock /> */}
      <CollaborateBlock />
      <HighlighBlocks />
      <div className="col-span-3 mt-6 flex justify-center">
        <Link to="/signin">
          <Button intent="outline">
            <span className="font-bold">Get started 🚀</span>
          </Button>
        </Link>
      </div>
    </motion.section>
  );
};
