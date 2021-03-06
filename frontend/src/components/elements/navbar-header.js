import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import Image from "../image"
import Search from "./search/Search"
import {
  mediaPropTypes,
  linkPropTypes,
  buttonLinkPropTypes,
} from "@/utils/types"
import { getButtonAppearance } from "@/utils/button"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"
import { localizePath } from "@/utils/localize"

const NavbarHeader = ({ navbar, pageContext }) => {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)
  return (
    <div className="off_home">
      {/* The actual navbar */}
      <nav className=" py-6 sm:py-2 navbar">
        <div className="xl:px-8 flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link
              to={localizePath({ ...pageContext, isPreview: false, slug: "" })}
            >
              <Image
                placeholder="none"
                media={navbar.logo}
                className="h-24 w-auto object-contain logo"
              />
            </Link>
          </div>
          <Search details={pageContext?.listSneakers} />
          {/* List of links on desktop */}

          <div className="flex items-center">
            <ul className="hidden list-none md:flex flex-row gap-4 items-baseline ml-10">
              {navbar.links.map(navLink => (
                <li key={navLink.id}>
                  <CustomLink
                    link={{
                      ...navLink,
                      url: `${localizePath({
                        ...pageContext,
                        isPreview: false,
                        // Remove the '/'
                        slug: navLink.url.slice(1),
                      })}`,
                    }}
                  >
                    <div className="px-2 py-1">{navLink.text}</div>
                  </CustomLink>
                </li>
              ))}
            </ul>
            {/* Locale Switch Mobile */}
            {pageContext?.localizations && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block md:hidden"
            >
              <MdMenu className="h-8 w-auto" />
            </button>

            {/* CTA button on desktop */}
            {navbar?.button && (
              <div className="hidden md:block ml-4 navlink">
                <ButtonLink
                  button={navbar?.button}
                  appearance={getButtonAppearance(navbar?.button?.type, "dark")}
                  compact
                />
              </div>
            )}
            {/* Locale Switch Desktop */}
            {pageContext?.localizations && (
              <div className="hidden md:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </div>
  )
}

NavbarHeader.propTypes = {
  navbar: PropTypes.shape({
    logo: mediaPropTypes,
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
}

export default NavbarHeader
