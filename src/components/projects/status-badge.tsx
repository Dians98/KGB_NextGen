import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/content/projects";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const common = useTranslations("Common");
  return status === "done" ? (
    <Badge tone="delivered">{common("done")}</Badge>
  ) : (
    <Badge tone="progress">{common("inProgress")}</Badge>
  );
}
