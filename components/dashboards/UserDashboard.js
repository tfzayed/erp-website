"use client";

import { useAppContext } from "app/provider";
import { Badge } from "../ui/badge";

const UserDashboard = ({ userEmail }) => {
  const {
    userState: { users },
    toolState: { tools },
    courseState: { courses },
    profileState: { profiles },
    assetState: { assets },
  } = useAppContext();

  const user = users.filter((u) => userEmail === u?.email);

  return (
    <>
      <div className="expand_border mb-2">
        <h5 className="mb-3">Tools</h5>
        {tools
          .filter((data) =>
            data?.organization?.find((d) => d.users.includes(user[0]?.user_id))
          )
          .map((a, i) => (
            <div key={i} className="flex items-centers mb-2">
              <h6 className="mr-2">{a?.platform}:</h6>
              {a?.organization?.map((b, i) => (
                <Badge key={i} variant="outline" className="mr-2">
                  {b.name}
                </Badge>
              ))}
            </div>
          ))}
      </div>
      <div className="expand_border mb-2">
        <h5 className="mb-3">Courses</h5>
        {courses
          .filter((data) =>
            data.course.find((d) => d.users.includes(user[0]?.user_id))
          )
          .map((a, i) => (
            <div key={i} className="flex items-centers mb-2">
              <h6 className="mr-2">{a?.platform}:</h6>
              {a.course.map((b, i) => (
                <Badge key={i} variant="outline" className="mr-2">
                  {b.name}
                </Badge>
              ))}
            </div>
          ))}
      </div>
      <div className="expand_border mb-2">
        <h5 className="mb-3">Profiles</h5>
        {profiles
          .filter((data) =>
            data.profiles.find((d) => d.users.includes(user[0]?.user_id))
          )
          .map((a, i) => (
            <div key={i} className="flex items-centers mb-2">
              <h6 className="mr-2">{a?.platform}:</h6>
              {a.profiles.map((b, i) => (
                <Badge key={i} variant="outline" className="mr-2">
                  {b.name}
                </Badge>
              ))}
            </div>
          ))}
      </div>
      <div className="expand_border mb-2">
        <h5 className="mb-3">Assets</h5>
        <div className="flex items-centers mb-2">
          <h6 className="mr-2">Devices:</h6>
          {assets
            .filter((asset) => asset.user[0] === user[0]?.user_id)
            .map((el, i) => (
              <Badge key={i} variant="outline" className="mr-2">
                {el.name}
              </Badge>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
