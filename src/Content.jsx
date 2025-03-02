import './index.css'
import { createRoot } from 'react-dom/client'
import ContentPage from './content/ContentBox.jsx'
import ErrorBoundary from './error/ErrorBoundary.jsx'

const root = document.createElement('div')
root.id = '__leetcode_ai_container'
document.body.append(root)

createRoot(root).render(
    <ErrorBoundary>
      <ContentPage />
    </ErrorBoundary>
)