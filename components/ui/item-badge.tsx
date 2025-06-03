interface ItemBadgeProps {
  name: string;
}

export function ItemBadge({ name }: ItemBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
      {name}
    </span>
  );
}
