import { Label } from "../ui/label";

export function TitleHeader({ title }: { title: string }) {
  return (
    <>
      <Label className="text-2xl font-bold">{title}</Label>
    </>
  );
}
