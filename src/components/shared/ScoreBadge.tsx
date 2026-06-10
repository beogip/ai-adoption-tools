interface Props {
  badge: "ok" | "warn" | "bad";
  children: React.ReactNode;
}

/** Status pill used to surface a classification zone. */
export default function ScoreBadge({ badge, children }: Props) {
  return <span className={`badge ${badge}`}>{children}</span>;
}
