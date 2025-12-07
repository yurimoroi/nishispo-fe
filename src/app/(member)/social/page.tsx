import SectionBreadcrumbs from "@/components/feature/breadcrumbs/section-breadcrumbs";
import { PageTitle } from "@/components/feature/common";
import MainBlock from "@/components/feature/wrapper/main-block";
import {
  SocialBadge,
  SocialBlock,
  SocialIcon,
  SocialIconBlock,
  SocialItem,
  SocialItems,
  SocialLabel,
  SocialLinkFacebook,
  SocialLinkInstagram,
  SocialLinkLine,
  SocialLinkTwitter,
  UnlinkSocial,
} from "@/components/social";
import { Metadata } from "next";
import IconFacebookColored from "@public/icon-fb-colored.svg";
import IconXColored from "@public/icon-x-colored.svg";
import IconLineColored from "@public/icon-line-colored.svg";
import IconInstagramColored from "@public/icon-instagram-colored.svg";
import { getUserDetail } from "@/components/mypage";
import { SocialProvider } from "@/components/social/lib/types";

export const metadata: Metadata = {
  title: "ソーシャルメディア連携 - ミヤスポ ",
};

export default async function Page() {
  const [getUserDetailResponse] = await Promise.all([getUserDetail()]);

  const data = getUserDetailResponse?.data || {};

  if (!data) {
    return <MainBlock>No User Data Found</MainBlock>;
  }

  const { line_id, x_id, facebook_id, instagram_id } = data;

  return (
    <MainBlock>
      <SectionBreadcrumbs />
      <PageTitle>SNS連携</PageTitle>
      {/* Disabling Social Linking, since we do not have a domain yet, remove disabled once it is available, Instagram has different reason */}
      <SocialItems className="pointer-events-none opacity-50">
        <SocialItem>
          <SocialBlock>
            <SocialIconBlock>
              <SocialIcon imageSource={IconLineColored} />
            </SocialIconBlock>
            <SocialLabel>LINE</SocialLabel>
          </SocialBlock>
          <SocialBlock className="justify-between lg:justify-end">
            {line_id ? (
              <>
                <SocialBadge isLinked>連携済み</SocialBadge>
                <UnlinkSocial provider={SocialProvider.Line}>
                  連携解除する
                </UnlinkSocial>
              </>
            ) : (
              <>
                <SocialBadge>未連携</SocialBadge>
                <SocialLinkLine />
              </>
            )}
          </SocialBlock>
        </SocialItem>
        <SocialItem className="pointer-events-none opacity-50">
          <SocialBlock>
            <SocialIconBlock>
              <SocialIcon imageSource={IconXColored} />
            </SocialIconBlock>
            <SocialLabel>X</SocialLabel>
          </SocialBlock>
          <SocialBlock className="justify-between lg:justify-end">
            {x_id ? (
              <>
                <SocialBadge isLinked>連携済み</SocialBadge>
                <UnlinkSocial provider={SocialProvider.TwitterX}>
                  連携解除する
                </UnlinkSocial>
              </>
            ) : (
              <>
                <SocialBadge>未連携</SocialBadge>
                <SocialLinkTwitter />
              </>
            )}
          </SocialBlock>
        </SocialItem>

        <SocialItem className="pointer-events-none opacity-50">
          <SocialBlock>
            <SocialIconBlock>
              <SocialIcon imageSource={IconFacebookColored} />
            </SocialIconBlock>
            <SocialLabel>facebook</SocialLabel>
          </SocialBlock>
          <SocialBlock className="justify-between lg:justify-end">
            {facebook_id ? (
              <>
                <SocialBadge isLinked>連携済み</SocialBadge>
                <UnlinkSocial provider={SocialProvider.Facebook}>
                  連携解除する
                </UnlinkSocial>
              </>
            ) : (
              <>
                <SocialBadge>未連携</SocialBadge>
                <SocialLinkFacebook />
              </>
            )}
          </SocialBlock>
        </SocialItem>
        {/* Disabling Instagram Login since Facebook deprecated as of this writing */}
        <SocialItem className="pointer-events-none opacity-50">
          <SocialBlock>
            <SocialIconBlock>
              <SocialIcon imageSource={IconInstagramColored} />
            </SocialIconBlock>
            <SocialLabel>Instagram</SocialLabel>
          </SocialBlock>
          <SocialBlock className="justify-between lg:justify-end">
            {instagram_id ? (
              <>
                <SocialBadge isLinked>連携済み</SocialBadge>
                <UnlinkSocial provider={SocialProvider.Instagram}>
                  連携解除する
                </UnlinkSocial>
              </>
            ) : (
              <>
                <SocialBadge>未連携</SocialBadge>
                <SocialLinkInstagram />
              </>
            )}
          </SocialBlock>
        </SocialItem>
      </SocialItems>
    </MainBlock>
  );
}
