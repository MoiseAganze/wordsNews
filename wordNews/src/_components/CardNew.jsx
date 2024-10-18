import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function CardNew({ datas }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [imageUrl, setImageUrl] = React.useState("/noimage.jpeg");

  React.useEffect(() => {
    if (datas.image) {
      const img = new Image();
      img.src = datas.image;

      img.onload = () => setImageUrl(datas.image); // Si l'image charge correctement
      img.onerror = () => setImageUrl("/noimage.jpeg"); // Si une erreur survient (404 par exemple)
    }
  }, [datas.image]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mon super site",
          text: "Viens voir cette page incroyable !",
          url: window.location.href,
        });
        console.log("Contenu partagé avec succès");
      } catch (error) {
        console.error("Échec du partage:", error);
      }
    } else {
      alert("La fonction de partage n'est pas supportée sur ce navigateur.");
    }
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            A
          </Avatar>
        }
        title={datas.author}
        subheader={datas.publish_date}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={datas.title}
      />
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontWeight: "bold", mb: 2 }}
        >
          {datas.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {datas.summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography sx={{ marginBottom: 2 }}>
            Catégorie:{" "}
            <span style={{ fontWeight: "bold" }}>{datas.category}</span>
          </Typography> */}
          <Typography sx={{ marginBottom: 1 }}>Détails:</Typography>
          <Typography sx={{ marginBottom: 2 }}>{datas.text}</Typography>
          <Link
            component="button"
            variant="body2"
            to={datas.url}
            style={{ marginTop: 3, marginBottom: 3 }}
          >
            encore plus des details
          </Link>
        </CardContent>
      </Collapse>
    </Card>
  );
}
