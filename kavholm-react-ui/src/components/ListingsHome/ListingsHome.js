import { ListingsGrid } from "components"
import "./ListingsHome.css"

const ListingsHome = ({ listings }) => {
  return (
    <div className="ListingsHome">
      <div className="splash-image">
        <ListingsGrid listings={listings} />
      </div>
    </div>
  )
}

export default ListingsHome
