export interface SpotlightProps {
  children: React.ReactNode
  className?: string
  ProximitySpotlight?: boolean
  HoverFocusSpotlight?: boolean
  CursorFlowGradient?: boolean
}
export interface SpotlightItemProps {
  children: React.ReactNode
  className?: string
}

export interface SpotLightContextType {
  ProximitySpotlight: boolean
  HoverFocusSpotlight: boolean
  CursorFlowGradient: boolean
}