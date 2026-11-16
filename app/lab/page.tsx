import { PageHeader } from "@/components/PageHeader";
import { HeroGraphic } from "@/components/Graphics";
import { BridgeGraphic, DotFieldGraphic, LayersGraphic, OrbitGraphic, RingsGraphic, SignalGraphic } from "@/components/GraphicVariants";

export const metadata = { title: "Graphic variations", robots: { index: false, follow: false } };

export default function Lab() {
  const items = [
    { k: "A", name: "Triangle (previous)", node: <HeroGraphic className="h-auto w-full" /> },
    { k: "B", name: "Bridge", node: <BridgeGraphic className="h-auto w-full" /> },
    { k: "C", name: "Stacked rings (selected, live on home)", node: <RingsGraphic className="h-auto w-full" /> },
    { k: "D", name: "Orbit", node: <OrbitGraphic className="h-auto w-full" /> },
    { k: "E", name: "Signal path", node: <SignalGraphic className="h-auto w-full" /> },
    { k: "F", name: "Dot field", node: <DotFieldGraphic className="h-auto w-full" /> },
    { k: "G", name: "Layers", node: <LayersGraphic className="h-auto w-full" /> },
  ];
  return (
    <>
      <PageHeader index="Preview" title="Graphic variations" intro="Temporary page to compare hero graphics. Scroll to trigger the animations. Tell me a letter to swap it onto the home page." />
      <section className="mx-auto mt-12 grid max-w-6xl gap-8 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
        {items.map((i) => (
          <div key={i.k} className="rounded-xl border border-line bg-surface p-6">
            <p className="label">{i.k}. {i.name}</p>
            <div className="mt-4">{i.node}</div>
          </div>
        ))}
      </section>
    </>
  );
}
