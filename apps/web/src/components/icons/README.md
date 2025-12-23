# Icon Components

This directory contains icon components using `lucide-astro`.

## Usage

### Option 1: Direct Import (Recommended)

Import icons directly from `lucide-astro` for better tree-shaking and performance:

```astro
---
import { User, Mail, Phone, ArrowRight } from 'lucide-astro'
---

<User size={24} />
<Mail size={24} color="#3b82f6" />
<Phone size={24} stroke-width={2} />
<ArrowRight size={20} class="icon-arrow" />
```

### Option 2: Dynamic Icon Component

Use the `Icon.astro` component for dynamic icon names:

```astro
---
import Icon from '@/components/icons/Icon.astro'
---

<Icon name="user" size={24} />
<Icon name="mail" size={24} color="#3b82f6" />
<Icon name="phone" size={24} stroke-width={2} />
```

**Note:** The dynamic component may have slightly larger bundle size as it needs to handle dynamic imports.

### Option 3: IconButton Component

Use the `IconButton` component for clickable icons:

```astro
---
import IconButton from '@/components/icons/IconButton.astro'
---

<IconButton 
  name="search" 
  label="Search" 
  variant="primary"
  size={20}
/>
```

### Option 4: Social Icons

Use the `SocialIcons` component for social media links:

```astro
---
import SocialIcons from '@/components/icons/SocialIcons.astro'

const socialLinks = [
  { platform: 'facebook', url: 'https://facebook.com/school', label: 'Facebook' },
  { platform: 'twitter', url: 'https://twitter.com/school', label: 'Twitter' },
  { platform: 'instagram', url: 'https://instagram.com/school', label: 'Instagram' },
]
---

<SocialIcons links={socialLinks} size={24} />
```

## Available Icons

All icons from [Lucide](https://lucide.dev/icons/) are available. Common icons include:

- **Navigation**: `menu`, `x`, `chevron-down`, `chevron-up`, `arrow-right`, `arrow-left`
- **Communication**: `mail`, `phone`, `message-circle`, `send`
- **Social**: `facebook`, `twitter`, `instagram`, `linkedin`, `youtube`
- **Education**: `book`, `graduation-cap`, `school`, `award`, `trophy`
- **UI**: `search`, `user`, `settings`, `heart`, `star`, `check`, `alert-circle`
- **Location**: `map-pin`, `navigation`, `globe`
- **Time**: `calendar`, `clock`, `calendar-days`

See the full list at [lucide.dev/icons](https://lucide.dev/icons/)

## Props

### Icon Component

- `name` (string, required) - Icon name in kebab-case (e.g., "user", "mail", "arrow-right")
- `size` (number | string, default: 24) - Icon size in pixels
- `class` (string) - Additional CSS classes
- `strokeWidth` (number, default: 2) - Stroke width
- `color` (string) - Icon color (CSS color value)

### IconButton Component

- `name` (string, required) - Icon name
- `label` (string, required) - Accessible label
- `size` (number | string, default: 20) - Icon size
- `variant` ('primary' | 'secondary' | 'outline' | 'ghost', default: 'primary')
- `href` (string, optional) - If provided, renders as `<a>` instead of `<button>`
- `class` (string) - Additional CSS classes

### SocialIcons Component

- `links` (array, required) - Array of social link objects
  - `platform` (string) - Platform name (facebook, twitter, etc.)
  - `url` (string) - Link URL
  - `label` (string, optional) - Accessible label
- `size` (number | string, default: 24) - Icon size
- `class` (string) - Additional CSS classes

## Best Practices

1. **Use direct imports** when you know the icon name at build time (better performance)
2. **Use Icon component** when the icon name is dynamic or comes from data
3. **Always provide accessible labels** for icon buttons
4. **Use semantic HTML** - prefer `<button>` or `<a>` over `<div>` for interactive icons
5. **Consistent sizing** - Use a consistent size scale (16, 20, 24, 32px)

