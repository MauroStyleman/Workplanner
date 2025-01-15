import HomeNavbar from "./HomeNavbar.tsx";
import {WorkplanList} from "./WorkPlanList.tsx";


export function HomePage() {
    return (
        <div>
            <HomeNavbar></HomeNavbar>
            <WorkplanList></WorkplanList>
        </div>
    );
}