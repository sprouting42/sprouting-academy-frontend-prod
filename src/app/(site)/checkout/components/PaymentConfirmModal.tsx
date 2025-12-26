import { PaymentConfirm, type PaymentConfirmData } from "@/components/modal";

interface PaymentConfirmModalProps {
  open: boolean;
  onClose: () => void;
  data: PaymentConfirmData | null;
}

export const PaymentConfirmModal = ({
  open,
  onClose,
  data,
}: PaymentConfirmModalProps) => {
  if (!data) return null;

  return <PaymentConfirm open={open} onClose={onClose} data={data} />;
};
