import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const mockGroups = [
    {
        name: "COMP202 STUDY GROUP",
        group_id: 1,
        student_count: 3,
    },
    {
        name: "VHDL LOVERS",
        group_id: 2,
        student_count: 5,
    }
]

const Groups = () => {
    const router = useRouter()
    const { id } = router.query

    const [groups, setGroups] = useState(mockGroups)
    return (
        <div  className="flex flex-col justify-center content-center items-center">
            {groups.map((group) => {
          console.log(group);
          return (
            <Link key={group.group_id} href={`/group/${group.group_id}`} prop>
              <div  className="flex justify-between space-x-5 w-[500px] bg-[#212326] text-xl my-2 rounded-lg p-[25px] transition transform hover:scale-125">
                <div className="text-left text-white">{group.name}</div>
                <div className="text-right text-white">{group.student_count}</div>
              </div>
            </Link>
          );
        })}
        </div>
    )
}

export default Groups