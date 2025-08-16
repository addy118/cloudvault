import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";

export default function BreadCrumbNav({ navigationPath, navigateToPath }) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {navigationPath.map((folder, index) => (
          <React.Fragment key={folder.id}>
            {index > 0 && (
              <BreadcrumbSeparator className="text-[#FFD369]">
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => navigateToPath(index)}
                className="cursor-pointer text-[#EEEEEE] hover:text-[#FFD369]"
              >
                {folder.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
