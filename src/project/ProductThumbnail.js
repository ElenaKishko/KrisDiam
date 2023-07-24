import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";

function ProductThumbnail(props) {
  const { product } = props;
  return (
    <Card className="thumbnail" sx={{ boxShadow: 0 }}>
      <Link to={"/product/" + product.id} state={{ product }}>
        <CardMedia className="thumbnail_img" image={product.url} />
      </Link>
      <CardContent sx={{ p: 0 }} className="thumbnail_descr">
        <CardHeader
          sx={{ p: 0 }}
          title={product.name}
          subheader={product.price + " nis"}
        />
      </CardContent>
    </Card>
  );
}
export default ProductThumbnail;
