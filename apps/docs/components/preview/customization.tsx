import { ServerCodeBlock } from '@vx-oss/docs-react/components/codeblock.rsc';

export function Customization() {
  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl border bg-fd-card text-fd-card-foreground not-prose">
      <p className="font-medium text-sm">Install via Fumadocs CLI</p>
      <p className="text-fd-muted-foreground text-sm">
        For advanced customization that supported options cannot suffice.
      </p>
      <ServerCodeBlock code="npx @vx-oss/docs-cli@latest customize" lang="bash" />
    </div>
  );
}
