import { Col, Divider, theme, Typography } from "antd";

interface ProfileRowProps {
  title: string;
  data: string | undefined;
  hasDivder: boolean | undefined;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ title, data, hasDivder }) => {
  const { token } = theme.useToken();

  return (
    <>
      <Col className="gutter-row" span={6}>
        {title}
      </Col>
      <Col className="gutter-row" span={18}>
        <Typography.Text style={{ fontWeight: "bold" }}>{data}</Typography.Text>
      </Col>

      {hasDivder ? (
        <Divider style={{ borderColor: token.colorBorder }} dashed />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileRow;
