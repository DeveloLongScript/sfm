import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export function TitleComponent(props: {
  title: string | JSX.Element;
  caption?: string | JSX.Element;
  rev?: boolean;
}) {
  return (
    <div>
      {(props.rev === undefined || props.rev === false) && (
        <Typography variant="overline">{props.caption}</Typography>
      )}

      <Typography variant="h3">{props.title}</Typography>
      {props.rev === true && (
        <Typography variant="overline">{props.caption}</Typography>
      )}
    </div>
  );
}

export function ProfileTitleComp(props: { name: string; iconsrc: string }) {
  return (
    <div>
      <Avatar
        sx={{ borderRadius: "4px", width: 80, height: 80 }}
        src={props.iconsrc}
        style={{
          background: "linear-gradient(358deg, #2e82a8, #2ea86e)",
          backgroundSize: "400% 400%",
          WebkitAnimation: "profileAnimation 5s ease infinite",
          MozAnimation: "profileAnimation 5s ease infinite",
          animation: "profileAnimation 5s ease infinite",
        }}
      />
      <br />
      <Typography variant="h5">{props.name}</Typography>
    </div>
  );
}
const toExport = { ProfileTitleComp, TitleComponent };

export default toExport;
