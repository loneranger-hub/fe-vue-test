import type { Action } from './actions'
import type { Component } from 'vue'

// Chat Message
export interface Message {
  text: string
  displayedText?: string
  sender: 'user' | 'assistant'
  timestamp: Date
  isStreaming?: boolean
  action?: Action
}

// Assistant Response
export interface AssistantResponse {
  message: string
  action?: Action
}

// Chart Data
export interface ChartData {
  title: string
  data: number[]
  labels: string[]
}

// Widget Component
export interface WidgetComponent {
  component: any
  props: Record<string, any>
}
