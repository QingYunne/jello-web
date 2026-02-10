import AppsIcon from '@mui/icons-material/Apps'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SvgIcon from '@mui/material/SvgIcon'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

import { ReactComponent as TrelloLogo } from '~/assets/trello.svg'

import ModeSelect from '~/components/ModeSelect'
import Recent from './Menu/Recent'
import Starred from './Menu/Starred'
import Templates from './Menu/Templates'
import Workspaces from './Menu/Workspaces'
import Profiles from './Menu/Profiles'

export default function AppBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.jello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflow: 'auto'
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <AppsIcon
          sx={{
            color: 'primary.main'
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloLogo}
            inheritViewBox
            sx={{ color: 'primary.main' }}
          />
          <Typography
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />

          <Button variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <TextField
          id="outlined-search"
          label="Search ..."
          type="search"
          size="small"
          sx={{ minWidth: '120px' }}
        />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <HelpOutlineIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}
