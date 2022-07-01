import {NavLink,  Outlet, useSearchParams, useLocation} from "react-router-dom";
import { getInvoices } from "../data";

// Using instead of NavLink to preserve location.search in URL.
function QueryNavLink({ to, ...props }) {
  console.log("QueryNavLink to:");
  console.log(to);
  //console.log("QueryNavLink key:");
  //console.log(key);
  console.log("QueryNavLink props:");
  console.log(props);
  //for (const arg of props) {
  //  console.log(arg);
  //}
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  console.log("Invoices location:");
  console.log(location);
  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""} // "filter" is reserved word.
          onChange={(event) => {
            let filter = event.target.value;
            console.log("Invoices filter:");
            console.log(filter);
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get("filter"); // "filter" is reserved word.
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          // Using QueryNavLink instead of NavLink to preserve location.search in URL.
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.number}
            >
            {invoice.name}
            </QueryNavLink>
            )
          )
        }
        <Outlet />
      </nav>
    </div>
  );
}
//color: isActive ? "red" : "",
//className={({ isActive }) => isActive ? "red" : "blue"}