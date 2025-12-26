import { useState } from "react";
import { Plus } from "lucide-react";
import ModalForums from "./components/ModalForums";
import ForumStats from "./components/ForumStats";
import ForumPostList from "./components/ForumPostList";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DashboardForums = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refetchForums, setRefetchForums] = useState<null | (() => void)>(null);

  return (
    <div className="lg:p-4 space-y-8 h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community Forum</h1>
          <p className="text-muted-foreground mt-1">
            Share repair knowledge and help save the planet from electronic waste.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-lg px-6 flex items-center">
              <Plus className="w-4 h-4 mr-2" /> Ask a Question
            </Button>
          </DialogTrigger>

          <ModalForums
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onSuccess={() => {
              setIsOpen(false);
              refetchForums?.();
            }}
          />
        </Dialog>
      </div>

      <ForumStats />
      <ForumPostList onReady={(refetch) => setRefetchForums(() => refetch)} />
    </div>
  );
};

export default DashboardForums;
