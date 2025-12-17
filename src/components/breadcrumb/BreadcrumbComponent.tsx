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

 const pathParts = location.pathname
  .split("/")
  .filter(Boolean)
  .filter(
    (part) =>
      part !== "admin" &&
      !isUUID(part)
  );


  const truncate = (text: string, limit = 30) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + "...";
  };

  const paths = pathParts.map((part, index) => {
    const decoded = decodeURIComponent(part);

    return {
      name:
        LABEL_MAP[decoded] ??
        decoded.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      url: "/" + pathParts.slice(0, index + 1).join("/"),
    };
  });

  if (queryTitle) {
    paths.push({
      name: decodeURIComponent(queryTitle),
      url: location.pathname + location.search,
    });
  }

  return (
    <Breadcrumb className="px-4 py-2">
      <BreadcrumbList>
        {paths.map((item, index) => {
          const isLast = index === paths.length - 1;

          return (
            <React.Fragment key={item.url + index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage title={item.name}>
                    {truncate(item.name)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.url} title={item.name}>
                      {truncate(item.name)}
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
