import Footer from "@/components/Footer";
import TopNav from "@/components/TopNav";
import Dropdown, {DropDownOption} from "@/components/Dropdown";

export default function Page() {

    const getRaceYearOptions = ():DropDownOption[] => {
        const yearsOptions:DropDownOption[] = [];

        for (let i=2024; i>2014; i--) {
            yearsOptions.push({
                label: `${i}`,
                value: i,
                // onClick: () => dispatch(f1Actions.setFilters({year: i} as F1RaceFilters))
            })
        }

        return yearsOptions;
    }
    return (
        <>
            <div className="page-container">
                <TopNav />
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <h1>Dashboard</h1>
                    <Dropdown
                        label="Race Year"
                        options={getRaceYearOptions()}
                    />
                </main>

                <Footer />
            </div>
        </>
    );
}
