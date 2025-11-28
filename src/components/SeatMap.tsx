import React, { memo } from "react";
import { SeatSchema } from "../types";
import { useTranslation } from "react-i18next";

interface Props {
  schema: SeatSchema;
  selectedSeats: number[];
  onToggleSeat: (seatNo: number) => void;
}

const SeatCell = memo(
  ({
    row,
    col,
    cellType,
    seat,
    isSelected,
    onToggle,
  }: {
    row: number;
    col: number;
    cellType: number;
    seat: any;
    isSelected: boolean;
    onToggle: (no: number) => void;
  }) => {
    // 2: corridor
    if (cellType === 2) {
      return (
        <div className="w-10 h-10 flex items-center justify-center text-xs text-slate-300 dark:text-slate-600"></div>
      );
    }

    // 3: door
    if (cellType === 3) {
      return (
        <div className="w-10 h-10 flex items-center justify-center">
          <div className="w-8 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
        </div>
      );
    }

    // 0: seat
    if (cellType === 0) {
      if (!seat) return <div className="w-10 h-10"></div>;

      const isTaken = seat.status === "taken";
      const isFemale = seat.gender === "female";

      let bgClass =
        "bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500 hover:border-blue-400 dark:hover:border-blue-400 text-slate-600 dark:text-slate-200 cursor-pointer";

      if (isTaken) {
        bgClass = isFemale
          ? "bg-pink-100 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800 text-pink-400 dark:text-pink-300 cursor-not-allowed"
          : "bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500 cursor-not-allowed";
      } else if (isSelected) {
        bgClass =
          "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none";
      }

      return (
        <button
          disabled={isTaken}
          onClick={() => onToggle(seat.no)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${bgClass}`}
          aria-label={isTaken ? `Seat ${seat.no} Taken` : `Seat ${seat.no}`}
        >
          {seat.no}
        </button>
      );
    }
    return null;
  }
);

export const SeatMap: React.FC<Props> = memo(
  ({ schema, selectedSeats, onToggleSeat }) => {
    const { t } = useTranslation();
    const { layout, seats } = schema;

    return (
      <div className="flex flex-col items-center bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-200">
        {/* Driver Area */}
        <div className="w-full flex justify-between mb-8 px-4 opacity-50 dark:opacity-70">
          <div className="w-10 h-10 border-2 border-slate-300 dark:border-slate-500 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold dark:text-slate-300">
              WHEEL
            </span>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest pt-2 dark:text-slate-400">
            Front
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
          }}
        >
          {layout.cells.map((rowCells, rIndex) =>
            rowCells.map((_, cIndex) => {
              const seat = seats.find(
                (s) => s.row === rIndex && s.col === cIndex
              );
              return (
                <SeatCell
                  key={`${rIndex}-${cIndex}`}
                  row={rIndex}
                  col={cIndex}
                  cellType={layout.cells[rIndex][cIndex]}
                  seat={seat}
                  isSelected={seat ? selectedSeats.includes(seat.no) : false}
                  onToggle={onToggleSeat}
                />
              );
            })
          )}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-8 text-xs font-medium text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700"></div>
            <span>{t("seats.legendEmpty")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-600 border border-blue-600"></div>
            <span>{t("seats.legendSelected")}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-600"></div>
            <span>{t("seats.legendTaken")}</span>
          </div>
        </div>
      </div>
    );
  }
);
