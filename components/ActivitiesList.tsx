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
      className="grid py-3 items-center"
      style={{
        gridTemplateColumns: "minmax(0, 1fr) auto 20px 64px 80px 40px",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar user={item.user} />

        <div className="min-w-0">
          <div className="text-sm font-medium text-text truncate">
            {item.user}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <ActivityStatusButton status={item.status} />
      </div>

      <div />

      <div className="text-right text-sm font-semibold text-text">
        {item.amountShort}
      </div>

      <div className="text-right text-sm text-text-subtle">{item.price}</div>

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
