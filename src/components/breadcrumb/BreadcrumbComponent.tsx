import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index !== paths.length - 1 ? (
              <>
                <BreadcrumbLink asChild>
                  <Link to={item.url}>{item.name}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
