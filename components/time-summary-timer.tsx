import React, { HTMLAttributes, useContext } from "react";
import { CommonStoreContext } from "@/stores/common";
import Trans from "next-translate/Trans";
import { cx } from "@/utils/helper";

export interface Props extends React.ComponentPropsWithoutRef<"div"> {}

export default function TimeSummaryTimer({ className }: Props) {
  const { timer } = useContext(CommonStoreContext);

  return (
    <div
      className={cx(
        "flex items-baseline justify-center text-5xl md:text-6xl font-light gap-2",
        className
      )}
    >
      {timer[0] > 0 ? (
        <>
          <KeyValueComp>
            <Trans
              ns="common"
              i18nKey="timerHour"
              components={[<ValueComp key="hour" />]}
              values={{ hour: timer[0] }}
            />
          </KeyValueComp>
          {timer[1] > 0 && (
            <KeyValueComp>
              <Trans
                ns="common"
                i18nKey="timerMinute"
                components={[<ValueComp key="minute" />]}
                values={{ minute: timer[1] }}
              />
            </KeyValueComp>
          )}
        </>
      ) : (
        <>
          {timer[1] > 0 && (
            <KeyValueComp>
              <Trans
                ns="common"
                i18nKey="timerMinute"
                components={[<ValueComp key="minute" />]}
                values={{ minute: timer[1] }}
              />
            </KeyValueComp>
          )}
          {timer[1] === 0 && (
            <KeyValueComp>
              <Trans
                ns="common"
                i18nKey="timerSecond"
                components={[
                  <ValueComp key="second" className="tabular-nums" />,
                ]}
                values={{ second: timer[2] }}
              />
            </KeyValueComp>
          )}
        </>
      )}
    </div>
  );
}

function KeyValueComp({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx("inline-flex items-baseline gap-0.5", className)}
      {...props}
    />
  );
}

function ValueComp({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <b className={cx("font-semibold text-[1.1em]", className)} {...props} />
  );
}
