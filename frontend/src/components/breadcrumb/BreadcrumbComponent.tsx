import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export function BreadcrumbComponent() {
  const location = useLocation();

  const pathParts = location.pathname
    .split("/")
    .filter((part) => part !== "" && part !== "admin");

  const paths = pathParts.map((part, index) => ({
    name: part.charAt(0).toUpperCase() + part.slice(1).replace("-", " "),
    url: "/" + pathParts.slice(0, index + 1).join("/"),
  }));

  return (
    <Breadcrumb className="pb-5">
      <BreadcrumbList>
        {paths.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === paths.length - 1 ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.url}>{item.name}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index !== paths.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
