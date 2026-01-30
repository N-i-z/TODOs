import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/styles/*.css"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          active: "var(--primary-active)",
          muted: "var(--primary-muted)",
        },

        background: {
          DEFAULT: "var(--background)",
          container: "var(--background-container)", // cards, panels
          contrast: "var(--background-contrast)", // alternate backgrounds
        },

        border: {
          DEFAULT: "var(--border)",
          muted: "var(--border-muted)",
        },

        typography: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
        },

        success: {
          DEFAULT: "var(--success)",
          hover: "var(--success-hover)",
          active: "var(--success-active)",
          muted: "var(--success-muted)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          hover: "var(--warning-hover)",
          active: "var(--warning-active)",
          muted: "var(--warning-muted)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          hover: "var(--danger-hover)",
          active: "var(--danger-active)",
          muted: "var(--danger-muted)",
        },
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
      },

      fontSize: {
        xs: "var(--text-xs)",
        sm: "var(--text-sm)",
        base: "var(--text-base)",
        lg: "var(--text-lg)",
        xl: "var(--text-xl)",
        "2xl": "var(--text-2xl)",
      },
    },
  },
  plugins: [],
} satisfies Config;
