import styled from "styled-components";

const VideoPlayer = ({ poster, video }) => {
  return (
    <Style autoPlay loop muted preload="none" poster={poster}>
      <source src={video} type="video/mp4" />
    </Style>
  );
};

export default VideoPlayer;

const Style = styled.video`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
  transform: scale(0.7) translateY(-100px);
`;
