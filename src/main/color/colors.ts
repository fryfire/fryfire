import { expose } from "../util/env";
import { Color } from "./Color";
import { RGBColor } from "./RGBColor";

/**
 * Map with named colors.
 */
export const namedColors: Record<string, Color> = {
    "aliceblue": RGBColor.fromUint32(0xfffff8f0, true),
    "antiquewhite": RGBColor.fromUint32(0xffd7ebfa, true),
    "aqua": RGBColor.fromUint32(0xffffff00, true),
    "aquamarine": RGBColor.fromUint32(0xffd4ff7f, true),
    "azure": RGBColor.fromUint32(0xfffffff0, true),
    "beige": RGBColor.fromUint32(0xffdcf5f5, true),
    "bisque": RGBColor.fromUint32(0xffc4e4ff, true),
    "black": RGBColor.fromUint32(0xff000000, true),
    "blanchedalmond": RGBColor.fromUint32(0xffcdebff, true),
    "blue": RGBColor.fromUint32(0xffff0000, true),
    "blueviolet": RGBColor.fromUint32(0xffe22b8a, true),
    "brown": RGBColor.fromUint32(0xff2a2aa5, true),
    "burlywood": RGBColor.fromUint32(0xff87b8de, true),
    "cadetblue": RGBColor.fromUint32(0xffa09e5f, true),
    "chartreuse": RGBColor.fromUint32(0xff00ff7f, true),
    "chocolate": RGBColor.fromUint32(0xff1e69d2, true),
    "coral": RGBColor.fromUint32(0xff507fff, true),
    "cornflowerblue": RGBColor.fromUint32(0xffed9564, true),
    "cornsilk": RGBColor.fromUint32(0xffdcf8ff, true),
    "crimson": RGBColor.fromUint32(0xff3c14dc, true),
    "cyan": RGBColor.fromUint32(0xffffff00, true),
    "darkblue": RGBColor.fromUint32(0xff8b0000, true),
    "darkcyan": RGBColor.fromUint32(0xff8b8b00, true),
    "darkgoldenrod": RGBColor.fromUint32(0xff0b86b8, true),
    "darkgray": RGBColor.fromUint32(0xffa9a9a9, true),
    "darkgreen": RGBColor.fromUint32(0xff006400, true),
    "darkgrey": RGBColor.fromUint32(0xffa9a9a9, true),
    "darkkhaki": RGBColor.fromUint32(0xff6bb7bd, true),
    "darkmagenta": RGBColor.fromUint32(0xff8b008b, true),
    "darkolivegreen": RGBColor.fromUint32(0xff2f6b55, true),
    "darkorange": RGBColor.fromUint32(0xff008cff, true),
    "darkorchid": RGBColor.fromUint32(0xffcc3299, true),
    "darkred": RGBColor.fromUint32(0xff00008b, true),
    "darksalmon": RGBColor.fromUint32(0xff7a96e9, true),
    "darkseagreen": RGBColor.fromUint32(0xff8fbc8f, true),
    "darkslateblue": RGBColor.fromUint32(0xff8b3d48, true),
    "darkslategray": RGBColor.fromUint32(0xff4f4f2f, true),
    "darkslategrey": RGBColor.fromUint32(0xff4f4f2f, true),
    "darkturquoise": RGBColor.fromUint32(0xffd1ce00, true),
    "darkviolet": RGBColor.fromUint32(0xffd30094, true),
    "deeppink": RGBColor.fromUint32(0xff9314ff, true),
    "deepskyblue": RGBColor.fromUint32(0xffffbf00, true),
    "dimgray": RGBColor.fromUint32(0xff696969, true),
    "dimgrey": RGBColor.fromUint32(0xff696969, true),
    "dodgerblue": RGBColor.fromUint32(0xffff901e, true),
    "firebrick": RGBColor.fromUint32(0xff2222b2, true),
    "floralwhite": RGBColor.fromUint32(0xfff0faff, true),
    "forestgreen": RGBColor.fromUint32(0xff228b22, true),
    "fuchsia": RGBColor.fromUint32(0xffff00ff, true),
    "gainsboro": RGBColor.fromUint32(0xffdcdcdc, true),
    "ghostwhite": RGBColor.fromUint32(0xfffff8f8, true),
    "gold": RGBColor.fromUint32(0xff00d7ff, true),
    "goldenrod": RGBColor.fromUint32(0xff20a5da, true),
    "gray": RGBColor.fromUint32(0xff808080, true),
    "green": RGBColor.fromUint32(0xff008000, true),
    "greenyellow": RGBColor.fromUint32(0xff2fffad, true),
    "grey": RGBColor.fromUint32(0xff808080, true),
    "honeydew": RGBColor.fromUint32(0xfff0fff0, true),
    "hotpink": RGBColor.fromUint32(0xffb469ff, true),
    "indianred": RGBColor.fromUint32(0xff5c5ccd, true),
    "indigo": RGBColor.fromUint32(0xff82004b, true),
    "ivory": RGBColor.fromUint32(0xfff0ffff, true),
    "khaki": RGBColor.fromUint32(0xff8ce6f0, true),
    "lavender": RGBColor.fromUint32(0xfffae6e6, true),
    "lavenderblush": RGBColor.fromUint32(0xfff5f0ff, true),
    "lawngreen": RGBColor.fromUint32(0xff00fc7c, true),
    "lemonchiffon": RGBColor.fromUint32(0xffcdfaff, true),
    "lightblue": RGBColor.fromUint32(0xffe6d8ad, true),
    "lightcoral": RGBColor.fromUint32(0xff8080f0, true),
    "lightcyan": RGBColor.fromUint32(0xffffffe0, true),
    "lightgoldenrodyellow": RGBColor.fromUint32(0xffd2fafa, true),
    "lightgray": RGBColor.fromUint32(0xffd3d3d3, true),
    "lightgreen": RGBColor.fromUint32(0xff90ee90, true),
    "lightgrey": RGBColor.fromUint32(0xffd3d3d3, true),
    "lightpink": RGBColor.fromUint32(0xffc1b6ff, true),
    "lightsalmon": RGBColor.fromUint32(0xff7aa0ff, true),
    "lightseagreen": RGBColor.fromUint32(0xffaab220, true),
    "lightskyblue": RGBColor.fromUint32(0xffface87, true),
    "lightslategray": RGBColor.fromUint32(0xff998877, true),
    "lightslategrey": RGBColor.fromUint32(0xff998877, true),
    "lightsteelblue": RGBColor.fromUint32(0xffdec4b0, true),
    "lightyellow": RGBColor.fromUint32(0xffe0ffff, true),
    "lime": RGBColor.fromUint32(0xff00ff00, true),
    "limegreen": RGBColor.fromUint32(0xff32cd32, true),
    "linen": RGBColor.fromUint32(0xffe6f0fa, true),
    "magenta": RGBColor.fromUint32(0xffff00ff, true),
    "maroon": RGBColor.fromUint32(0xff000080, true),
    "mediumaquamarine": RGBColor.fromUint32(0xffaacd66, true),
    "mediumblue": RGBColor.fromUint32(0xffcd0000, true),
    "mediumorchid": RGBColor.fromUint32(0xffd355ba, true),
    "mediumpurple": RGBColor.fromUint32(0xffdb7093, true),
    "mediumseagreen": RGBColor.fromUint32(0xff71b33c, true),
    "mediumslateblue": RGBColor.fromUint32(0xffee687b, true),
    "mediumspringgreen": RGBColor.fromUint32(0xff9afa00, true),
    "mediumturquoise": RGBColor.fromUint32(0xffccd148, true),
    "mediumvioletred": RGBColor.fromUint32(0xff8515c7, true),
    "midnightblue": RGBColor.fromUint32(0xff701919, true),
    "mintcream": RGBColor.fromUint32(0xfffafff5, true),
    "mistyrose": RGBColor.fromUint32(0xffe1e4ff, true),
    "moccasin": RGBColor.fromUint32(0xffb5e4ff, true),
    "navajowhite": RGBColor.fromUint32(0xffaddeff, true),
    "navy": RGBColor.fromUint32(0xff800000, true),
    "oldlace": RGBColor.fromUint32(0xffe6f5fd, true),
    "olive": RGBColor.fromUint32(0xff008080, true),
    "olivedrab": RGBColor.fromUint32(0xff238e6b, true),
    "orange": RGBColor.fromUint32(0xff00a5ff, true),
    "orangered": RGBColor.fromUint32(0xff0045ff, true),
    "orchid": RGBColor.fromUint32(0xffd670da, true),
    "palegoldenrod": RGBColor.fromUint32(0xffaae8ee, true),
    "palegreen": RGBColor.fromUint32(0xff98fb98, true),
    "paleturquoise": RGBColor.fromUint32(0xffeeeeaf, true),
    "palevioletred": RGBColor.fromUint32(0xff9370db, true),
    "papayawhip": RGBColor.fromUint32(0xffd5efff, true),
    "peachpuff": RGBColor.fromUint32(0xffb9daff, true),
    "peru": RGBColor.fromUint32(0xff3f85cd, true),
    "pink": RGBColor.fromUint32(0xffcbc0ff, true),
    "plum": RGBColor.fromUint32(0xffdda0dd, true),
    "powderblue": RGBColor.fromUint32(0xffe6e0b0, true),
    "purple": RGBColor.fromUint32(0xff800080, true),
    "red": RGBColor.fromUint32(0xff0000ff, true),
    "rosybrown": RGBColor.fromUint32(0xff8f8fbc, true),
    "royalblue": RGBColor.fromUint32(0xffe16941, true),
    "saddlebrown": RGBColor.fromUint32(0xff13458b, true),
    "salmon": RGBColor.fromUint32(0xff7280fa, true),
    "sandybrown": RGBColor.fromUint32(0xff60a4f4, true),
    "seagreen": RGBColor.fromUint32(0xff578b2e, true),
    "seashell": RGBColor.fromUint32(0xffeef5ff, true),
    "sienna": RGBColor.fromUint32(0xff2d52a0, true),
    "silver": RGBColor.fromUint32(0xffc0c0c0, true),
    "skyblue": RGBColor.fromUint32(0xffebce87, true),
    "slateblue": RGBColor.fromUint32(0xffcd5a6a, true),
    "slategray": RGBColor.fromUint32(0xff908070, true),
    "slategrey": RGBColor.fromUint32(0xff908070, true),
    "snow": RGBColor.fromUint32(0xfffafaff, true),
    "springgreen": RGBColor.fromUint32(0xff7fff00, true),
    "steelblue": RGBColor.fromUint32(0xffb48246, true),
    "tan": RGBColor.fromUint32(0xff8cb4d2, true),
    "teal": RGBColor.fromUint32(0xff808000, true),
    "thistle": RGBColor.fromUint32(0xffd8bfd8, true),
    "tomato": RGBColor.fromUint32(0xff4763ff, true),
    "turquoise": RGBColor.fromUint32(0xffd0e040, true),
    "violet": RGBColor.fromUint32(0xffee82ee, true),
    "wheat": RGBColor.fromUint32(0xffb3def5, true),
    "white": RGBColor.fromUint32(0xffffffff, true),
    "whitesmoke": RGBColor.fromUint32(0xfff5f5f5, true),
    "yellow": RGBColor.fromUint32(0xff00ffff, true),
    "yellowgreen": RGBColor.fromUint32(0xff32cd9a, true)
};

expose("fryfire.namedColors", namedColors);
