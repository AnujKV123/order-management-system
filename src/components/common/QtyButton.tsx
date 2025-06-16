import React, { useCallback } from "react";
import Button from "./Button";
import Input from "./Input";
import { Plus, Minus } from "lucide-react";

interface QtyButtonProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const QtyButton = React.memo(
  ({ value, onChange, min = 1, max = 999 }: QtyButtonProps) => {
    const handleIncrement = useCallback(() => {
      if (value < max) {
        onChange(value + 1);
      }
    }, [value, max, onChange]);

    const handleDecrement = useCallback(() => {
      if (value > min) {
        onChange(value - 1);
      }
    }, [value, min, onChange]);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Only allow whole numbers
        if (!/^\d*$/.test(inputValue)) {
          return;
        }

        const newValue = parseInt(inputValue);

        // Handle empty input
        if (inputValue === "") {
          onChange(min);
          return;
        }

        if (!isNaN(newValue) && newValue >= min && newValue <= max) {
          onChange(newValue);
        }
      },
      [min, max, onChange]
    );

    const handleBlur = useCallback(() => {
      // Ensure value is within bounds on blur
      if (value < min) {
        onChange(min);
      } else if (value > max) {
        onChange(max);
      }
    }, [value, min, max, onChange]);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDecrement}
          disabled={value <= min}
        >
          <Minus width={10} height={10} />
        </Button>
        <div style={{ width: "40px", marginTop: "14px" }}>
          <Input
            type="text"
            value={value.toString()}
            onChange={handleInputChange}
            onBlur={handleBlur}
            name="qty"
            style={{
              padding: "6px",
              fontSize: "12px",
              textAlign: "center",
              width: "100%",
            }}
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleIncrement}
          disabled={value >= max}
        >
          <Plus width={10} height={10} />
        </Button>
      </div>
    );
  }
);

QtyButton.displayName = "QtyButton";
