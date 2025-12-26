import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const LABEL_MAP: Record<string, string> = {
  user: "User",
  history: "History",
  diagnosa: "Diagnosa",
};

export function BreadcrumbComponent() {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const queryTitle = searchParams.get("question");

  const isUUID = (value: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);

  const truncate = (text: string, limit = 24) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  const pathParts = location.pathname
    .split("/")
    .filter(Boolean)
    .filter(
      (part) =>
        part !== "admin" &&
        !isUUID(part)
    );

  const paths = pathParts.map((part, index) => {
    const decoded = decodeURIComponent(part);

    return {
      name:
        LABEL_MAP[decoded] ??
        decoded.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: "/" + pathParts.slice(0, index + 1).join("/"),
    };
  });

  // 👉 query "question" JANGAN tampil full
  if (queryTitle) {
    paths.push({
      name: "Detail",
      fullName: decodeURIComponent(queryTitle),
      url: location.pathname + location.search,
      isQuery: true,
    } as any);
  }

  return (
    <Breadcrumb className="px-4 py-2">
      <BreadcrumbList className="flex-wrap">
        {paths.map((item: any, index) => {
          const isLast = index === paths.length - 1;

          const displayName = item.isQuery
            ? "Detail"
            : truncate(item.name);

          return (
            <React.Fragment key={item.url + index}>
              <BreadcrumbItem className="max-w-[140px] sm:max-w-none text-[10px] lg:text-sm">
                {isLast ? (
                  <BreadcrumbPage
                    title={item.fullName ?? item.name}
                    className="truncate"
                  >
                    {displayName}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.url}
                      title={item.fullName ?? item.name}
                      className="truncate block max-w-[120px] sm:max-w-none"
                    >
                      {displayName}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
