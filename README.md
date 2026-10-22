# Cosmit Avatars 🚀

**Retrieve profile pictures from multiple platforms using a single, simple URL.**

[Website](https://cosmitavatars.space) · [Providers](https://cosmitavatars.space/providers)

Cosmit Avatars is a simple and convenient way to retrieve user profile pictures from different platforms through a unified URL structure. Instead of implementing a separate integration for every provider, you can use a single endpoint format to access avatars.

## ✨ Features

- 🌐 **Multiple providers** — Retrieve avatars from supported platforms.
- 🔗 **Simple URLs** — Access profile pictures using a consistent URL structure.
- ⚡ **Easy integration** — Use avatars in websites, applications, and other projects.
- 🧩 **Developer-friendly** — Integrate with React, JavaScript, HTML, or any application that supports image URLs.
- 🔍 **Provider discovery** — Explore the available platforms through the providers page.

## 🚀 Getting Started

You can retrieve an avatar by specifying the provider and the user's username.

### URL Structure

```text
https://cosmitavatars.space/avatar/{provider}/{username}
```

Replace the following parameters:

- `provider` — The platform from which you want to retrieve the avatar.
- `username` — The username or identifier of the account.

### Examples

**Xbox**
```text
https://cosmitavatars.space/avatar/xbox/xantocosmobl
```

**Twitch**
```text
https://cosmitavatars.space/avatar/twitch/xcosmo_
```

**GitHub**
```text
https://cosmitavatars.space/avatar/github/gabocts
```

> These examples demonstrate the URL structure. Availability depends on the supported providers and the identifiers accepted by each platform.

## 💻 Usage

### HTML

Display a user's avatar directly in an image element:

```html
<img
  src="https://cosmitavatars.space/avatar/github/gabocts"
  alt="GitHub profile picture"
/>
```

### React

Create a reusable avatar component:

```jsx
export function Avatar({ provider, username, alt }) {
  const src =
    `https://cosmitavatars.space/avatar/${provider}/${encodeURIComponent(username)}`;

  return (
    <img
      src={src}
      alt={alt ?? `${username}'s avatar`}
      loading="lazy"
    />
  );
}
```

Example:

```jsx
<Avatar provider="twitch" username="xcosmo_" />
```

### JavaScript

Generate an avatar URL dynamically:

```js
function getAvatarUrl(provider, username) {
  return `https://cosmitavatars.space/avatar/${provider}/${encodeURIComponent(username)}`;
}

const avatar = getAvatarUrl("github", "gabocts");

console.log(avatar);
```

## 🌐 Supported Providers

Visit the providers page to explore the available platforms:

**https://cosmitavatars.space/providers**

The supported providers and their requirements may vary by platform.

## 📌 Use Cases

Cosmit Avatars can be useful for:

- Community websites and forums.
- Gaming profiles and player directories.
- Streaming dashboards and Twitch integrations.
- Developer portfolios and GitHub-related projects.
- Applications that display user profiles from multiple platforms.

## 🤝 Contributing

Suggestions, and bug reports are welcome.

If you find an issue or have an idea to improve Cosmit Avatars, consider opening an issue in the project's repository.

## 📄 License

Cosmit Avatars is licensed under the [MIT License](./LICENSE.md).

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, subject to the terms of the license.

See the [LICENSE](./LICENSE.md) file for the full license text.

---

Made with ❤️ for developers.

**Cosmit Avatars** — One URL, multiple platforms.
