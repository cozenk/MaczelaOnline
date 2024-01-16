import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "(pages)/admin/components/ui/avatar";

export default function SalesList({ sales = [] }) {
  return (
    <div className="space-y-8">
      {sales.map((order) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            {order.customer.image_url ? (
              <AvatarImage src={order.customer.image_url} alt="Avatar" />
            ) : null}
            <AvatarFallback>
              {order.customer.full_name?.[0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order.customer.full_name}{" "}
              {order.customer.mobile_number &&
                `(${order.customer.mobile_number})`}
            </p>
            <p className="text-muted-foreground text-sm">
              {order.customer.email}
            </p>
          </div>
          <div className="ml-auto font-medium">+{order.total_price}</div>
        </div>
      ))}
    </div>
  );
}
