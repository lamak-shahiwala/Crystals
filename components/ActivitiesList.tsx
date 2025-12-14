"use client";

import ActivityStatusButton from "./ActivityStatusButton";
import { Activity } from "@/types/activity";

function Avatar({ user }: { user: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
      {user.charAt(0).toUpperCase()}
    </div>
  );
}

function ActivityRow({ item }: { item: Activity }) {
  return (
    <div
      className="
        grid py-3 items-center
        sm:[grid-template-columns:minmax(0,1fr)_auto_20px_64px_80px_40px]
      "
      style={{
        gridTemplateColumns: "minmax(0,1fr)_auto_8px_48px_64px_32px",
      }}
    >
      {/* User */}
      <div className="flex items-center gap-3 min-w-0">
        <Avatar user={item.user} />

        <div className="min-w-0">
          <div className="text-sm font-medium text-text truncate">
            {item.user}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex justify-center items-center">
        <ActivityStatusButton status={item.status} />
      </div>

      {/* Spacer */}
      <div />

      {/* Amount */}
      <div className="text-right text-sm font-semibold text-text">
        {item.amountShort}
      </div>

      {/* Price */}
      <div className="text-right text-sm text-text-subtle">{item.price}</div>

      {/* Time */}
      <div className="text-right text-xs text-text-muted">{item.timeAgo}</div>
    </div>
  );
}

export default function ActivitiesList({ items }: { items: Activity[] }) {
  return (
    <div className="mt-2">
      {items.map((activity) => (
        <ActivityRow key={activity.id} item={activity} />
      ))}
    </div>
  );
}
