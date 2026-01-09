import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

interface BackButtonProps {
  className?: string;
}

export const BackButton = ({ className }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={cn(
        "inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium mb-4",
        className
      )}
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back</span>
    </button>
  );
};
