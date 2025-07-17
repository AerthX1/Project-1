import React from "react";
import { Card, CardContent } from "../Ui/card";
import { Button } from "../Ui/button";

const users = [
  {
    email: "hardik@aerthx.com",
    role: "Client",
    actions: ["Chat", "Suspend"],
  },
  {
    email: "user@domain.com",
    role: "Enterprise",
    actions: ["Chat", "Unblock"],
  },
];

const LiveUserControl = () => {
  return (
    <Card>
      <CardContent className="py-4">
        <h2 className="text-lg font-bold text-white mb-4">Live User Control</h2>
        {users.map((user, index) => (
          <div key={index} className="flex justify-between items-center text-white mb-3">
            <div>
              <p className="font-medium ">{user.email}</p>
              <p className="text-sm ">{user.role}</p>
            </div>
            <div className="flex gap-2">
              {user.actions.map((action, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant={action === "Suspend" ? "destructive" : "outline"}
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LiveUserControl;
