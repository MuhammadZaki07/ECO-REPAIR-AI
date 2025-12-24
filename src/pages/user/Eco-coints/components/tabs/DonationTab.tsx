import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Leaf,
  Heart,
  TrendingUp,
  CheckCircle2,
  Info,
  Sparkles,
} from "lucide-react";
import { LiquidButton } from "@/components/liquid-glass-button";

// import { useDonationCampaigns } from "@/hooks/useDonationCampaigns";
import { DonationService } from "@/services/DonationService";
import { Link } from "react-router-dom";

/* ======================
 * UI TYPE
 * ====================== */
interface UIDonation {
  id: string;
  title: string;
  goal: number;
  current: number;
  description?: string;
  impact?: string;
}

// export default function DonationTab({ search }: { search: string }) {
//   const { campaigns, refetch } = useDonationCampaigns();

//   const [donationDialogOpen, setDonationDialogOpen] = useState(false);
//   const [successDialogOpen, setSuccessDialogOpen] = useState(false);
//   const [infoDialogOpen, setInfoDialogOpen] = useState(false);

//   const [selectedDonation, setSelectedDonation] = useState<UIDonation | null>(
//     null
//   );

//   const [donationAmount, setDonationAmount] = useState("");
//   const [agreedToTerms, setAgreedToTerms] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   /* ======================
//    * MAP DB → UI
//    * ====================== */
//   const donations: UIDonation[] = campaigns
//     .map((c) => ({
//       id: c.id,
//       title: c.title,
//       goal: c.goal_eco_coin,
//       current: c.current_eco_coin,
//       description: c.description,
//       impact: "1 EC = Real environmental impact",
//     }))
//     .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()));

//   const getProgressPercentage = (current: number, goal: number) =>
//     Math.min((current / goal) * 100, 100);

//   const handleDonateClick = (item: UIDonation) => {
//     setSelectedDonation(item);
//     setDonationAmount("");
//     setAgreedToTerms(false);
//     setDonationDialogOpen(true);
//   };

//   const handleInfoClick = (item: UIDonation) => {
//     setSelectedDonation(item);
//     setInfoDialogOpen(true);
//   };

//   const handleConfirmDonation = async () => {
//     if (!selectedDonation || !donationAmount || !agreedToTerms) return;

//     try {
//       setSubmitting(true);
//       await DonationService.donate(selectedDonation.id, Number(donationAmount));
//       setDonationDialogOpen(false);
//       setSuccessDialogOpen(true);
//       refetch();
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {donations.map((item) => {
//           const progress = getProgressPercentage(item.current, item.goal);

//           return (
//             <Card key={item.id}>
//               <CardContent className="space-y-4">
//                 <div className="h-32 rounded-2xl bg-muted/30 flex items-center justify-center text-5xl">
//                   IMG
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <Link to={`/useruser/ecocoin/donation/${item.id}`}>
//                       <h4 className="font-bold text-lg hover:underline">{item.title}</h4>
//                     </Link>
//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       onClick={() => handleInfoClick(item)}
//                     >
//                       <Info className="w-4 h-4" />
//                     </Button>
//                   </div>

//                   <Badge variant="outline" className="text-[10px] w-fit">
//                     <Sparkles className="w-3 h-3 mr-1" />
//                     Impact Driven
//                   </Badge>

//                   <p className="text-xs text-muted-foreground line-clamp-2">
//                     {item.description}
//                   </p>

//                   <div className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="text-muted-foreground">Progress</span>
//                       <span className="font-semibold">
//                         {item.current} / {item.goal} EC
//                       </span>
//                     </div>
//                     <Progress value={progress} className="h-2" />
//                     <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
//                       <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
//                       {progress.toFixed(0)}% funded
//                     </div>
//                   </div>
//                 </div>

//                 <LiquidButton
//                   size="xl"
//                   className="w-full"
//                   onClick={() => handleDonateClick(item)}
//                 >
//                   <span className="flex items-center gap-1">
//                     <Heart className="w-4 h-4 mr-2" />
//                     Donate Now
//                   </span>
//                 </LiquidButton>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* INFO DIALOG */}
//       <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
//         <DialogContent className="sm:max-w-[420px]">
//           <DialogHeader>
//             <DialogTitle>{selectedDonation?.title}</DialogTitle>
//             <DialogDescription>Campaign information & impact</DialogDescription>
//           </DialogHeader>

//           <Alert className="bg-emerald-500/5">
//             <Leaf className="h-4 w-4 text-emerald-500" />
//             <AlertDescription>{selectedDonation?.impact}</AlertDescription>
//           </Alert>

//           <p className="text-sm text-muted-foreground">
//             {selectedDonation?.description}
//           </p>
//         </DialogContent>
//       </Dialog>

//       {/* DONATION DIALOG */}
//       <Dialog open={donationDialogOpen} onOpenChange={setDonationDialogOpen}>
//         <DialogContent className="sm:max-w-[450px]">
//           <DialogHeader>
//             <DialogTitle>Make a Donation</DialogTitle>
//             <DialogDescription>
//               Support {selectedDonation?.title}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4">
//             <Alert className="bg-emerald-500/5">
//               <Leaf className="h-4 w-4 text-emerald-500" />
//               <AlertDescription>
//                 Impact: {selectedDonation?.impact}
//               </AlertDescription>
//             </Alert>

//             <div className="space-y-2">
//               <Label>Donation Amount (EC)</Label>
//               <Input
//                 type="number"
//                 min={10}
//                 value={donationAmount}
//                 onChange={(e) => setDonationAmount(e.target.value)}
//               />
//               <p className="text-xs text-muted-foreground">
//                 1 EC = Rp 1.000 • Min 10 EC
//               </p>
//             </div>

//             <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
//               <Checkbox
//                 checked={agreedToTerms}
//                 onCheckedChange={(v) => setAgreedToTerms(!!v)}
//               />
//               <Label className="text-sm">
//                 I agree this donation will be recorded on the blockchain
//               </Label>
//             </div>

//             <div className="flex gap-2">
//               <Button
//                 className="flex-1"
//                 disabled={
//                   submitting ||
//                   !donationAmount ||
//                   !agreedToTerms ||
//                   Number(donationAmount) < 10
//                 }
//                 onClick={handleConfirmDonation}
//               >
//                 <CheckCircle2 className="w-4 h-4 mr-2" />
//                 Confirm Donation
//               </Button>
//               <Button
//                 variant="outline"
//                 onClick={() => setDonationDialogOpen(false)}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* SUCCESS */}
//       <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
//         <DialogContent className="sm:max-w-[400px] text-center">
//           <div className="space-y-4 py-4">
//             <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
//             <DialogHeader>
//               <DialogTitle>Donation Successful 🎉</DialogTitle>
//               <DialogDescription>
//                 Thank you for making a difference
//               </DialogDescription>
//             </DialogHeader>
//             <p className="text-xl font-bold text-emerald-500">
//               {donationAmount} EC
//             </p>
//             <Button
//               className="w-full"
//               onClick={() => setSuccessDialogOpen(false)}
//             >
//               Close
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }
