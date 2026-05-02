import type * as React from 'react'
import type { Breakpoint } from '@mui/material/styles'
import type { OutlinedInputProps } from '@mui/material/OutlinedInput'
import type { PaperProps } from '@mui/material/Paper'
import type { SelectProps } from '@mui/material/Select'
import type { TypographyProps } from '@mui/material/Typography'

type ResponsiveLegacyGridValue<T> = T | Array<T | null> | { [key in Breakpoint]?: T | null }
type LegacyGridSize = 'auto' | 'grow' | number | false

declare module '@mui/material/Grid' {
  interface GridBaseProps {
    item?: boolean
    xs?: ResponsiveLegacyGridValue<LegacyGridSize>
    sm?: ResponsiveLegacyGridValue<LegacyGridSize>
    md?: ResponsiveLegacyGridValue<LegacyGridSize>
    lg?: ResponsiveLegacyGridValue<LegacyGridSize>
    xl?: ResponsiveLegacyGridValue<LegacyGridSize>
  }
}

declare module '@mui/material/TextField' {
  interface BaseTextFieldProps {
    InputProps?: Partial<OutlinedInputProps>
    InputLabelProps?: Record<string, unknown>
    SelectProps?: Partial<SelectProps>
  }
}

declare module '@mui/material/Menu' {
  interface MenuProps {
    PaperProps?: Partial<PaperProps>
  }
}

declare module '@mui/material/Drawer' {
  interface DrawerProps {
    PaperProps?: Partial<PaperProps>
  }
}

declare module '@mui/material/Dialog' {
  interface DialogProps {
    PaperProps?: Partial<PaperProps>
  }
}

declare module '@mui/material/ListItemText' {
  interface ListItemTextProps<
    PrimaryTypographyComponent extends React.ElementType = 'span',
    SecondaryTypographyComponent extends React.ElementType = 'p',
  > {
    primaryTypographyProps?: TypographyProps<PrimaryTypographyComponent>['sx']
    secondaryTypographyProps?: TypographyProps<SecondaryTypographyComponent>['sx']
  }
}
