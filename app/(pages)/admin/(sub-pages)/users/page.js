import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "(pages)/admin/components/ui/avatar";
import { TabsContent } from "(pages)/admin/components/ui/tabs";
import {
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { getAllUsers } from "@utils/users";

export default async function AdminUsers() {
  const users = await getAllUsers();

  console.log("USERS: ", users);

  return (
    <TabsContent value="users" className="pt-8">
      <div className="space-y-8">
        {users.length > 0 ? (
          <>
            <div className="flex items-center text-sm font-medium leading-none">
              <div className="w-full">Info</div>
              <div className="w-full">Email</div>
              <div className="w-full">Mobile number</div>
              <div className="w-full">Address</div>
              <div className="ml-auto">Actions</div>
            </div>

            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center text-sm font-medium leading-none"
              >
                <div className="flex w-full items-center space-y-1">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.image_url} alt="user-avatar" />
                    <AvatarFallback>
                      {user.first_name?.[0]?.toUpperCase()}
                      {user.last_name?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="text-sm font-medium leading-none">
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                </div>

                <div className="w-full">{user.email}</div>
                <div className="w-full">
                  {user.mobile_number || (
                    <p className="cursor-pointer text-gray-400 underline">
                      Add +
                    </p>
                  )}
                </div>
                <div className="w-full">{user.street_address}</div>

                <div className="ml-auto font-medium">
                  <EllipsisHorizontalIcon
                    className="cursor-pointer hover:text-gray-400"
                    width={30}
                  />
                </div>
              </div>
            ))}
          </>
        ) : (
          <h2>No users</h2>
        )}
      </div>
    </TabsContent>
  );
}
