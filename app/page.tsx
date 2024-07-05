"use client";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Snippet } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";

import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col  text-center items-center justify-center w-2/3 gap-4 pt-10">
        <Spacer y={10} />
        <h1 className={title({ size: "lg" })}>
          Semalessly perform&nbsp;
          <span className={title({ size: "lg", color: "yellow" })}>
            inspections&nbsp;
          </span>
          on our world-class equipment to ensure the your safety.
        </h1>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
      <div>
        <Snippet
          hideCopyButton
          hideSymbol
          className="py-3 px-5 m-10"
          variant="flat"
        >
          <span>
            Get started on your&nbsp;&nbsp;
            <Link
              className={buttonStyles({
                color: "warning",
                radius: "full",
                variant: "shadow",
              })}
              href="/begin"
              underline="hover"
            >
              Inspection
            </Link>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
